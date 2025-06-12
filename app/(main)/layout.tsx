type Props = {
    children: React.ReactNode;
};

const MainLayout = ({children,}: Props) => {
    return (
        <>
            <main className="pl-[256px] h-full">
                <div className="bg-red-500 h-full">
                    {children}
                </div>
            </main>
        </>
    );
};

export default MainLayout;