import React, { useState } from "react";

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

const Tabs = ({
  tabs,
  defaultActiveTab,
}: {
  tabs: Tab[];
  defaultActiveTab?: string;
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id); 

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      <div
        className="tab-controls tabs-small tabs-rounded"
        data-highlight="bg-theme"
      >
        {tabs.map((tab: Tab) => (
            
          <a
          key={tab.id}
          href="#"
          data-active={activeTab === tab.id ? true : undefined} // Add the `data-active` attribute for the active tab
          data-bs-toggle="collapse"
          data-bs-target={`#${tab.id}`}
          className={`tab-link ${activeTab === tab.id ? "active" : ""}`} // Add "active" class for styling
          onClick={(e) => {
            e.preventDefault();
            handleTabClick(tab.id);
          }}
          >
            {tab.label}
          </a>
        ))}
      </div>

      <div className="clearfix mb-3"></div>

      <div>
        {tabs.map((tab: Tab) => (
          <div
            key={tab.id}
            id={tab.id}
            className={`tab-pane collapse ${
              activeTab === tab.id ? "show" : ""
            }`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
