function Tab(props) {
  const activeClass = props.isActive ? 'active' : '';

  return (
    <button
      className={`tablist__tab ${activeClass}`}
      id={`tab${props.content.id}`}
      role="tab"
      tabIndex={props.isActive ? 0 : -1}
      aria-controls={`tabpanel${props.content.id}`}
      aria-selected={props.isActive}
      onClick={props.handleTabClick}
      onKeyDown={props.handleKeyDown}
      data-testid="tab"
    >
      {props.content.title}
    </button>
  );
}

export default Tab;
