function TabPanel(props) {
  return (
    <section
      className="tabs__panel"
      id={`tabpanel${props.options.id}`}
      role="tabpanel"
      tabIndex="0"
      aria-labelledby={`tab${props.options.id}`}
      aria-live="polite"
      data-testid="tab-panel"
    >
      {props.options.panelContent}
    </section>
  );
}

export default TabPanel;
