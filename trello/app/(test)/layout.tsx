const TestLayout = (
    {
        children,
    }: {
        children: React.ReactNode;
}
) => {
    return (
        <div>
            <div className ="h-full">
                This is a navbar
            </div>
            <hr />
            {children}
        </div>
    );
};

export default TestLayout;