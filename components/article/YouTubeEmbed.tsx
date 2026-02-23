"use client"

interface YouTubeEmbedProps {
  videoId: string
  title: string
  caption?: string
}

export function YouTubeEmbed({ videoId, title, caption }: YouTubeEmbedProps) {
  return (
    <figure className="my-8">
      <div className="relative overflow-hidden rounded-2xl bg-muted" style={{ aspectRatio: "16/9" }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      {caption ? (
        <figcaption className="mt-2 text-center text-xs leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
