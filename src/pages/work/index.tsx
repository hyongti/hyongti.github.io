import Link from "next/link";
import Content from "components/layouts/Content";
import SEO, { SITE_URL } from "components/SEO";

type Status = "완료" | "진행 중" | "운영 중" | "판매 예정" | "연재 중";

type WorkItem = {
  title: string;
  desc: string;
  status?: Status;
  href?: string;
};

// 나중에 채우기: 예) { title: "홈페이지 제작", desc: "...", status: "완료", href: "..." }
const categories: { title: string; items: WorkItem[] }[] = [];

const statusStyle: Record<Status, string> = {
  "완료": "bg-gray-50 text-gray-500 ring-gray-200",
  "진행 중": "bg-sky-50 text-sky-700 ring-sky-100",
  "운영 중": "bg-emerald-50 text-emerald-700 ring-emerald-100",
  "판매 예정": "bg-amber-50 text-amber-700 ring-amber-100",
  "연재 중": "bg-sky-50 text-sky-700 ring-sky-100",
};

function StatusChip({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyle[status]}`}
    >
      {status}
    </span>
  );
}

function Item({ item }: { item: WorkItem }) {
  const inner = (
    <>
      <div className="flex items-center gap-2">
        <h3 className="font-bold text-gray-800 group-hover:text-sky-700">
          {item.title}
        </h3>
        {item.status && <StatusChip status={item.status} />}
      </div>
      <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
    </>
  );

  return (
    <div className="border-b border-gray-100 pb-4">
      {item.href ? (
        <Link href={item.href} className="group block">
          {inner}
        </Link>
      ) : (
        <div>{inner}</div>
      )}
    </div>
  );
}

const Work = () => {
  return (
    <Content description="WORK">
      <SEO
        title="Work"
        description="외주·제품·강의 — 김형태가 하는 일"
        url={`${SITE_URL}/work`}
      />
      <div className="w-full max-w-2xl px-4">
        {categories.length === 0 ? (
          <p className="text-center text-sm text-gray-400">준비 중입니다.</p>
        ) : (
          <div className="space-y-12">
            {categories.map((cat) => (
              <section key={cat.title}>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {cat.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {cat.items.map((item) => (
                    <Item key={item.title} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </Content>
  );
};

export default Work;
