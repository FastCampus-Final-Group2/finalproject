interface DimmedProps {
  children?: React.ReactNode;
}

const Dimmed = ({ children }: DimmedProps) => {
  return (
    <div className="fixed left-0 top-0 z-modal flex h-screen w-screen items-center justify-center bg-black bg-opacity-40">
      {children}
    </div>
  );
};

export default Dimmed;
