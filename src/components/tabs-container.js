import { useRef, useState } from 'react';
import TabList from 'components/tab-list';
import TabPanel from 'components/tab-panel';

function TabsContainer(props) {
  const tabContainerRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleKeyDown = (event) => {
    const childTabs = tabContainerRef.current.children[0].children;
    const lastTab = props.tabsContent.length - 1;

    if (event.key === 'ArrowLeft') {
      const newActiveTab = activeTab !== 0 ? activeTab - 1 : lastTab;
      moveTab(childTabs, newActiveTab);
    }

    if (event.key === 'ArrowRight') {
      const updateActive = activeTab !== lastTab ? activeTab + 1 : 0;
      moveTab(childTabs, updateActive);
    }
  };

  const moveTab = (childTabs, tabIndex) => {
    setActiveTab(tabIndex);
    childTabs[tabIndex].focus();
  };

  return (
    <div className="tabs" ref={tabContainerRef} data-testid="tabs-container">
      <TabList
        options={props.tabsContent}
        activeTab={activeTab}
        handleTabClick={setActiveTab}
        handleKeyDown={handleKeyDown}
      />
      <TabPanel options={props.tabsContent[activeTab]} activeTab={activeTab} />
    </div>
  );
}

export default TabsContainer;
