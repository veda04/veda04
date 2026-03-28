<?php

class API {
    private $baseUrl;
    private $headers;
    private $timeout;
    private $lastResponse;
    private $lastHttpCode;
    private $lastError;

    /**
     * Initialize API client
     * @param string $baseUrl Base URL for the API
     * @param array $headers Default headers to include in all requests
     * @param int $timeout Request timeout in seconds
     */
    public function __construct($baseUrl = '', $headers = [], $timeout = 30) {
        $this->baseUrl = rtrim($baseUrl, '/');
        $this->headers = $headers;
        $this->timeout = $timeout;
        $this->lastResponse = null;
        $this->lastHttpCode = null;
        $this->lastError = null;
    }

    /**
     * Set authorization bearer token
     * @param string $token API token
     */
    public function setBearerToken($token) {
        $this->headers['Authorization'] = 'Bearer ' . $token;
        return $this;
    }

    /**
     * Set API key header
     * @param string $key API key
     * @param string $headerName Header name (default: X-API-Key)
     */
    public function setApiKey($key, $headerName = 'X-API-Key') {
        $this->headers[$headerName] = $key;
        return $this;
    }

    /**
     * Add custom header
     * @param string $name Header name
     * @param string $value Header value
     */
    public function setHeader($name, $value) {
        $this->headers[$name] = $value;
        return $this;
    }

    /**
     * Set multiple headers at once
     * @param array $headers Associative array of headers
     */
    public function setHeaders($headers) {
        $this->headers = array_merge($this->headers, $headers);
        return $this;
    }

    /**
     * Make a GET request
     * @param string $endpoint API endpoint
     * @param array $queryParams Query parameters
     * @param array $headers Additional headers for this request only
     * @return mixed Response data or false on failure
     */
    public function get($endpoint, $queryParams = [], $headers = []) {
        $url = $this->buildUrl($endpoint, $queryParams);
        return $this->request('GET', $url, null, $headers);
    }

    /**
     * Make a POST request
     * @param string $endpoint API endpoint
     * @param mixed $data Data to send (array will be JSON encoded)
     * @param array $headers Additional headers for this request only
     * @return mixed Response data or false on failure
     */
    public function post($endpoint, $data = [], $headers = []) {
        $url = $this->buildUrl($endpoint);
        return $this->request('POST', $url, $data, $headers);
    }

    /**
     * Make a PUT request
     * @param string $endpoint API endpoint
     * @param mixed $data Data to send
     * @param array $headers Additional headers for this request only
     * @return mixed Response data or false on failure
     */
    public function put($endpoint, $data = [], $headers = []) {
        $url = $this->buildUrl($endpoint);
        return $this->request('PUT', $url, $data, $headers);
    }

    /**
     * Make a PATCH request
     * @param string $endpoint API endpoint
     * @param mixed $data Data to send
     * @param array $headers Additional headers for this request only
     * @return mixed Response data or false on failure
     */
    public function patch($endpoint, $data = [], $headers = []) {
        $url = $this->buildUrl($endpoint);
        return $this->request('PATCH', $url, $data, $headers);
    }

    /**
     * Make a DELETE request
     * @param string $endpoint API endpoint
     * @param array $queryParams Query parameters
     * @param array $headers Additional headers for this request only
     * @return mixed Response data or false on failure
     */
    public function delete($endpoint, $queryParams = [], $headers = []) {
        $url = $this->buildUrl($endpoint, $queryParams);
        return $this->request('DELETE', $url, null, $headers);
    }

    /**
     * Make a custom HTTP request
     * @param string $method HTTP method
     * @param string $url Full URL
     * @param mixed $data Request body data
     * @param array $additionalHeaders Headers for this request only
     * @return mixed Response data or false on failure
     */
    private function request($method, $url, $data = null, $additionalHeaders = []) {
        $ch = curl_init();

        // Set URL
        curl_setopt($ch, CURLOPT_URL, $url);

        // Set method
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, strtoupper($method));

        // Return response instead of outputting
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Set timeout
        curl_setopt($ch, CURLOPT_TIMEOUT, $this->timeout);

        // Follow redirects
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

        // Include headers in output for debugging
        curl_setopt($ch, CURLOPT_HEADER, false);

        // Get response headers
        curl_setopt($ch, CURLOPT_HEADERFUNCTION, function($curl, $header) {
            return strlen($header);
        });

        // Merge headers
        $headers = array_merge($this->headers, $additionalHeaders);

        // Handle request body
        if ($data !== null && in_array(strtoupper($method), ['POST', 'PUT', 'PATCH'])) {
            if (is_array($data)) {
                $jsonData = json_encode($data);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
                $headers['Content-Type'] = 'application/json';
                $headers['Content-Length'] = strlen($jsonData);
            } else {
                curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            }
        }

        // Format headers for CURL
        $formattedHeaders = [];
        foreach ($headers as $key => $value) {
            $formattedHeaders[] = "$key: $value";
        }
        curl_setopt($ch, CURLOPT_HTTPHEADER, $formattedHeaders);

        // SSL verification (set to false for development, true for production)
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);

        // Execute request
        $response = curl_exec($ch);

        // Get HTTP status code
        $this->lastHttpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        // Check for errors
        if (curl_errno($ch)) {
            $this->lastError = curl_error($ch);
            curl_close($ch);
            return false;
        }

        curl_close($ch);

        // Store raw response
        $this->lastResponse = $response;

        // Try to decode JSON response
        $decoded = json_decode($response, true);
        if (json_last_error() === JSON_ERROR_NONE) {
            return $decoded;
        }

        // Return raw response if not JSON
        return $response;
    }

    /**
     * Build full URL with query parameters
     * @param string $endpoint Endpoint path
     * @param array $queryParams Query parameters
     * @return string Full URL
     */
    private function buildUrl($endpoint, $queryParams = []) {
        $endpoint = ltrim($endpoint, '/');
        $url = $this->baseUrl ? $this->baseUrl . '/' . $endpoint : $endpoint;

        if (!empty($queryParams)) {
            $query = http_build_query($queryParams);
            $url .= (strpos($url, '?') === false ? '?' : '&') . $query;
        }

        return $url;
    }

    /**
     * Get last HTTP status code
     * @return int|null HTTP status code
     */
    public function getLastHttpCode() {
        return $this->lastHttpCode;
    }

    /**
     * Get last raw response
     * @return string|null Raw response
     */
    public function getLastResponse() {
        return $this->lastResponse;
    }

    /**
     * Get last error message
     * @return string|null Error message
     */
    public function getLastError() {
        return $this->lastError;
    }

    /**
     * Check if last request was successful (2xx status code)
     * @return bool True if successful
     */
    public function isSuccess() {
        return $this->lastHttpCode >= 200 && $this->lastHttpCode < 300;
    }

    /**
     * Set request timeout
     * @param int $seconds Timeout in seconds
     */
    public function setTimeout($seconds) {
        $this->timeout = $seconds;
        return $this;
    }

    /**
     * Set base URL
     * @param string $url Base URL
     */
    public function setBaseUrl($url) {
        $this->baseUrl = rtrim($url, '/');
        return $this;
    }
}