<?php

// Require the Composer autoloader
require_once __DIR__ . '/../vendor/autoload.php';

// Load the environment variables from the .env file
try {
    if (!file_exists(__DIR__ . '/../.env')) {
        throw new Exception('.env file not found. Please create one based on .env.example.');
    }
} catch (Exception $e) {
    die($e->getMessage());
}

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../', '.env');
$dotenv->load();

// Application configuration
define('APP_NAME', $_ENV['APP_NAME'] ?? 'My App');
define('APP_URL', $_ENV['APP_URL'] ?? 'http://localhost');
define('BASE_URL', $_ENV['BASE_URL'] ?? __DIR__ . '/../' );
define('APP_ENV', $_ENV['APP_ENV'] ?? 'local');
define('APP_DEBUG', $_ENV['APP_DEBUG'] ?? true);
define('URL_REWRITING', $_ENV['URL_REWRITING'] ?? false);
define('MAINTENANCE_MODE', $_ENV['MAINTENANCE_MODE'] ?? false);

// Database configuration
define('DB_HOST', $_ENV['DB_HOST'] ?? '');
define('DB_PORT', $_ENV['DB_PORT'] ?? '');
define('DB_DATABASE', $_ENV['DB_DATABASE'] ?? '');
define('DB_USERNAME', $_ENV['DB_USERNAME'] ?? '');
define('DB_PASSWORD', $_ENV['DB_PASSWORD'] ?? '');

// Mail configuration
define('MAIL_HOST', $_ENV['MAIL_HOST'] ?? '');
define('MAIL_PORT', $_ENV['MAIL_PORT'] ?? '');
define('MAIL_USERNAME', $_ENV['MAIL_USERNAME'] ?? '');
define('MAIL_PASSWORD', $_ENV['MAIL_PASSWORD'] ?? '');
define('MAIL_FROM', $_ENV['MAIL_FROM'] ?? 'noreply@example.com');
define('MAIL_FROM_NAME', $_ENV['MAIL_FROM_NAME'] ?? 'Example');

// Constants for socials
define('SOCIAL_LINKEDIN', $_ENV['SOCIAL_LINKEDIN'] ?? '');
define('SOCIAL_GITHUB', $_ENV['SOCIAL_GITHUB'] ?? '');
define('SOCIAL_MEDIUM', $_ENV['SOCIAL_MEDIUM'] ?? '');
define('SOCIAL_INSTAGRAM', $_ENV['SOCIAL_INSTAGRAM'] ?? '');
define('SOCIAL_FACEBOOK', $_ENV['SOCIAL_FACEBOOK'] ?? '');
define('SOCIAL_TWITTER', $_ENV['SOCIAL_TWITTER'] ?? '');
define('SOCIAL_YOUTUBE', $_ENV['SOCIAL_YOUTUBE'] ?? '');

// Academic and Research Profiles
define('ACADEMIC_ORCID', $_ENV['ACADEMIC_ORCID'] ?? 'https://orcid.org/0009-0002-5110-8575');
define('ACADEMIC_PURE', $_ENV['ACADEMIC_PURE'] ?? 'https://pure.hud.ac.uk/en/persons/gulger-mallik');

// Constants for contact details
define('CONTACT_PHONE', $_ENV['CONTACT_PHONE'] ?? '');
define('CONTACT_PHONE2', $_ENV['CONTACT_PHONE2'] ?? '');
define('CONTACT_ADDRESS', $_ENV['CONTACT_ADDRESS'] ?? '');
define('CONTACT_EMAIL', $_ENV['CONTACT_EMAIL'] ?? '');
define('CONTACT_EMAIL2', $_ENV['CONTACT_EMAIL2'] ?? '');
define('CONTACT_ADDRESS_2', $_ENV['CONTACT_ADDRESS_2'] ?? '');

// CMS One Configuration
define('CMS_ONE_URL', $_ENV['CMS_ONE_URL'] ?? '');
define('CMS_ONE_API_URL', $_ENV['CMS_ONE_API_URL'] ?? '');
define('CMS_ONE_API_KEY', $_ENV['CMS_ONE_API_KEY'] ?? '');
define('CMS_ONE_TRACKING_TOKEN', $_ENV['CMS_ONE_TRACKING_TOKEN'] ?? '');
define('CMS_CACHE_ENABLED', ($_ENV['CMS_CACHE_ENABLED'] ?? 'false') === 'true');

// if site is in maintenance mode, redirect to maintenance page
if (MAINTENANCE_MODE == 'true') {
    // Get the current script path
    $currentScript = $_SERVER['PHP_SELF'];
    
    // Only redirect if we're not already on the maintenance page
    if (!str_contains($currentScript, '/errors/maintenance.php')) {
        header('Location: ' . APP_URL . '/errors/maintenance.php');
        exit;
    }
}