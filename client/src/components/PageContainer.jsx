function PageContainer({children}) {

  return (

    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-slate-100
      via-blue-50
      to-indigo-100
      py-10
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        "
      >

        {children}

      </div>

    </div>

  );

}

export default PageContainer;