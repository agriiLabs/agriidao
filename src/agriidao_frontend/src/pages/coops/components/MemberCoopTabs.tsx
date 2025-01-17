import React from "react";

interface CoopTabsProps {
  membership: {
     id: string; 
     balance: string;
  };
}

const CoopTabs: React.FC<CoopTabsProps> = ({ membership }) => {
  const tabs = [
    {
      id: "tab-2",
      label: "Transactions",
      content: (
        <div>
          <p>Transactions Content</p>
          <p>Accordion example, add content here.</p>
        </div>
      ),
    },
    {
      id: "tab-3",
      label: "Projects",
      content: (
        <div>
          <p>Projects Content</p>
          <p>Accordion example, add content here.</p>
        </div>
      ),
    },
  ];

  return (
    <div>
      {tabs.map((tab) => (
        <div key={tab.id}>
          <h2>{tab.label}</h2>
          {tab.content}
        </div>
      ))}
    </div>
  );
};

export default CoopTabs;
