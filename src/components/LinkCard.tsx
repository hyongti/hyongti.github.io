import Microlink from "@microlink/react";

type LinkCardProps = {
  url: string;
  title?: string;
  description?: string;
  image?: string;
};

// 수동 입력 또는 폴백용 커스텀 카드
function CustomCard({ url, title, description, image }: LinkCardProps) {
  const hostname = (() => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  })();

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block no-underline my-4 border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="flex">
        {image && (
          <div className="flex-shrink-0 w-[200px] h-[150px]">
            <img
              src={image}
              alt={title || ""}
              className="w-full h-full object-cover m-0"
            />
          </div>
        )}
        <div className="flex flex-col justify-center p-4 min-w-0">
          <div className="font-semibold text-gray-900 truncate">
            {title || hostname}
          </div>
          {description && (
            <div className="text-sm text-gray-500 mt-1 line-clamp-2">
              {description}
            </div>
          )}
          <div className="text-xs text-gray-400 mt-2 truncate">{hostname}</div>
        </div>
      </div>
    </a>
  );
}

export function LinkCard({ url, title, description, image }: LinkCardProps) {
  // 수동 입력이 있으면 커스텀 카드 렌더링
  if (title) {
    return (
      <CustomCard
        url={url}
        title={title}
        description={description}
        image={image}
      />
    );
  }

  // URL만 있으면 Microlink 사용, 실패 시 폴백
  return (
    <Microlink
      url={url}
      size="large"
      style={{ width: "100%", margin: "1rem 0" }}
      renderFallback={() => (
        <CustomCard
          url={url}
          description="링크를 미리 볼 수 없습니다. 클릭하여 방문하세요."
        />
      )}
    />
  );
}
