import Tab from 'components/tab';

function TabList(props) {
  const renderTabs = () => {
    return props.options.map((item, index) => {
      return (
        <Tab
          key={`tab-${index}`}
          content={item}
          isActive={index === props.activeTab}
          handleTabClick={() => props.handleTabClick(index)}
          handleKeyDown={props.handleKeyDown}
        />
      );
    });
  };

  return (
    <div
      className="tablist"
      role="tablist"
      aria-label="List of tabs"
      aria-orientation="horizontal"
      data-testid="tab-list"
    >
      {renderTabs()}
    </div>
  );
}

export default TabList;
