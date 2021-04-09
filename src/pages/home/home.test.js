import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import HomePage from './home';
import { tabsTop, tabsBottom } from 'content/tabs-content';

const content = [tabsTop, tabsBottom];

const getNumTabs = (content) => {
  let numTabs = 0;

  content.forEach((item) => {
    numTabs += item.length;
  });

  return numTabs;
};

describe('<HomePage />', () => {
  let homePage, tabsContainers, tabLists, tabs, tabPanels;

  beforeEach(() => {
    render(<HomePage />);
    homePage = screen.getByTestId('home-page');
    tabsContainers = screen.getAllByTestId('tabs-container');
    tabLists = screen.getAllByTestId('tab-list');
    tabs = screen.getAllByTestId('tab');
    tabPanels = screen.getAllByTestId('tab-panel');
  });

  afterEach(cleanup);

  it('Renders the <HomePage /> correctly with the correct content', () => {
    expect(homePage).toBeInTheDocument();
    expect(tabsContainers.length).toBe(content.length);
    expect(tabLists.length).toBe(content.length);
    expect(tabs.length).toBe(getNumTabs(content));
    expect(tabPanels.length).toBe(content.length);
  });

  it('Initializes the first tab in each tablist uniquely as "active"', () => {
    tabLists.forEach((item, index) => {
      expect(item.children[0]).toHaveClass('active');

      if (index !== 0) {
        expect(item.children[index]).not.toHaveClass('active');
      }
    });
  });

  it('Sets a tab as "active" onClick', () => {
    tabLists.forEach((item) => {
      expect(item.children[0]).toHaveClass('active');
      expect(item.children[1]).not.toHaveClass('active');

      fireEvent.click(item.children[1]);

      expect(item.children[0]).not.toHaveClass('active');
      expect(item.children[1]).toHaveClass('active');
    });
  });

  it('Sets a the appropriate content in the tabpanel on tab click', () => {
    tabs.forEach((item, index) => {
      const isTopPanel = index <= 2;
      const panelIndex = isTopPanel ? 0 : 1;
      const tabIndex = isTopPanel ? index : index - 3;

      fireEvent.click(item);

      expect(tabPanels[panelIndex].textContent).toBe(
        content[panelIndex][tabIndex].panelContent,
      );
    });
  });

  it('Navigates the tabs with "left" arrow keyboard btn', () => {
    tabLists.forEach((item) => {
      expect(item.children[0]).toHaveClass('active');

      fireEvent.click(item.children[0]);
      fireEvent.keyDown(item.children[0], {
        key: 'ArrowLeft',
        code: 'ArrowLeft',
      });

      expect(item.children[0]).not.toHaveClass('active');
      expect(item.children[2]).toHaveClass('active');
      expect(item.children[2]).toHaveFocus();

      fireEvent.keyDown(item.children[1], {
        key: 'ArrowLeft',
        code: 'ArrowLeft',
      });

      expect(item.children[2]).not.toHaveClass('active');
      expect(item.children[1]).toHaveClass('active');
      expect(item.children[1]).toHaveFocus();

      fireEvent.keyDown(item.children[1], {
        key: 'ArrowLeft',
        code: 'ArrowLeft',
      });

      expect(item.children[1]).not.toHaveClass('active');
      expect(item.children[0]).toHaveClass('active');
      expect(item.children[0]).toHaveFocus();
    });
  });

  it('Navigates the tabs with "right" arrow keyboard btn', () => {
    tabLists.forEach((item) => {
      expect(item.children[0]).toHaveClass('active');

      fireEvent.click(item.children[0]);
      fireEvent.keyDown(item.children[0], {
        key: 'ArrowRight',
        code: 'ArrowRight',
      });

      expect(item.children[0]).not.toHaveClass('active');
      expect(item.children[1]).toHaveClass('active');
      expect(item.children[1]).toHaveFocus();

      fireEvent.keyDown(item.children[1], {
        key: 'ArrowRight',
        code: 'ArrowRight',
      });

      expect(item.children[1]).not.toHaveClass('active');
      expect(item.children[2]).toHaveClass('active');
      expect(item.children[2]).toHaveFocus();

      fireEvent.keyDown(item.children[1], {
        key: 'ArrowRight',
        code: 'ArrowRight',
      });

      expect(item.children[2]).not.toHaveClass('active');
      expect(item.children[0]).toHaveClass('active');
      expect(item.children[0]).toHaveFocus();
    });
  });
});
