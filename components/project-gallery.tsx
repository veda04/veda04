"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";

import type { ArticleAsset } from "@/services/articles";

type ProjectGalleryProps = {
	assets: ArticleAsset[];
	projectTitle: string;
};

export default function ProjectGallery({ assets, projectTitle }: ProjectGalleryProps) {
	const [lightboxIndex, setLightboxIndex] = useState(-1);

	const images = assets.filter((asset) => (asset.type ?? "image") === "image");

	if (images.length === 0) {
		return null;
	}

	const slides = images.map((asset) => ({
		src: asset.url,
		alt: asset.alt || asset.caption || projectTitle,
		description: asset.caption || undefined,
	}));

	return (
		<>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{images.map((asset, index) => (
					<figure key={asset.id} className="group min-w-0">
						<button
							type="button"
							onClick={() => setLightboxIndex(index)}
							aria-label={`Open ${asset.caption || asset.alt || `image ${index + 1}`} fullscreen`}
							className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
						>
							<Image
								src={asset.url}
								alt={asset.alt || asset.caption || projectTitle}
								fill
								sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
								className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
							/>
						</button>
						{asset.caption ? (
							<figcaption className="mt-2 line-clamp-2 text-xs text-muted-foreground">
								{asset.caption}
							</figcaption>
						) : null}
					</figure>
				))}
			</div>

			<Lightbox
				open={lightboxIndex >= 0}
				index={lightboxIndex}
				close={() => setLightboxIndex(-1)}
				slides={slides}
				plugins={[Captions, Counter]}
				captions={{ descriptionTextAlign: "center" }}
				controller={{ closeOnBackdropClick: true }}
			/>
		</>
	);
}
