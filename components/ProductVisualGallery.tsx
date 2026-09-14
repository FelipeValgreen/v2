import Image from "next/image";
import { getVisuals } from "@/lib/visuals";

export function ProductVisualGallery({ slug }: { slug: string }) {
  const visuals = getVisuals(slug);
  const hero = visuals[0];
  if (!hero) return null;

  return (
    <section className="product-visual-gallery" aria-label="Galería de producto">
      <figure
        className="product-visual-gallery-main"
        data-visual-kind={hero.kind}
        data-visual-provenance={hero.provenance}
        data-source-width={hero.sourceWidth}
        data-source-height={hero.sourceHeight}
      >
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          sizes="(max-width: 900px) 100vw, 52vw"
          priority
          unoptimized={Boolean(hero.sourceWidth && hero.sourceHeight)}
        />
        <figcaption>
          <span>{hero.label}</span>
          {hero.note ? <small>{hero.note}</small> : null}
        </figcaption>
      </figure>
      {visuals.length > 1 ? (
        <div className="product-visual-gallery-strip" aria-label="Vistas del producto">
          {visuals.slice(1).map((visual) => (
            <figure
              key={visual.src}
              data-visual-kind={visual.kind}
              data-visual-provenance={visual.provenance}
              data-source-width={visual.sourceWidth}
              data-source-height={visual.sourceHeight}
            >
              <Image
                src={visual.src}
                alt={visual.alt}
                fill
                sizes="(max-width: 900px) 50vw, 17vw"
                unoptimized={Boolean(visual.sourceWidth && visual.sourceHeight)}
              />
              <figcaption>{visual.label}</figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </section>
  );
}
