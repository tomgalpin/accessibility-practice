import TabsContainer from 'components/tabs-container';
import { tabsTop, tabsBottom } from 'content/tabs-content';

function HomePage() {
  return (
    <div data-testid="home-page">
      <TabsContainer tabsContent={tabsTop} />
      <TabsContainer tabsContent={tabsBottom} />
    </div>
  );
}

export default HomePage;
