export default function GalleryTabs({ setSelectedTab, selectedTab }: any) {
  const tabs = ["Restaurants", "Hotels", "Residential", "Public Buildings"];

  return (
    <div className="flex justify-center gap-3 my-8 flex-wrap">
      {tabs.map((tab) => {
        const isActive = selectedTab === tab;

        return (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`
              px-4 py-2 min-w-[150px] font-inter rounded-full 
              transition-all duration-300 ease-in-out font-medium
              transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${
                isActive
                  ? "bg-[#CB7856] text-[#1D2930] hover:bg-yellow-600 focus:ring-yellow-500"
                  : "bg-[#D4C0A8] bg-opacity-60 border border-[#CB7856] text-black hover:bg-[#CB7856] focus:ring-gray-500"
              }
              shadow-md hover:shadow-lg
            `}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
