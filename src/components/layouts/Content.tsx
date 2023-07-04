import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  description?: ReactNode;
}

const Content = ({ children, description }: Props) => {
  return (
    <section className="w-full flex flex-col items-center gap-10">
      {description && <div className="text-[4rem]">{description}</div>}
      <div className="w-full flex flex-col items-center">{children}</div>
    </section>
  );
};

export default Content;
