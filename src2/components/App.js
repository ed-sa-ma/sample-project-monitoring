import React, { lazy, Suspense, useState } from "react";

import WelcomePage from "./WelcomePage/WelcomePage";
// import DataDisplay from "./components/DataDisplay/DataDisplay";

import "./app.css";
import Loading from "./Loading/Loading";

const DataDisplay = lazy(() => import("./DataDisplay/DataDisplay"));

function App() {
  const [collapsedWelcome, setCollapsedWelcome] = useState(false);

  return (
    <div className="App">
      <WelcomePage
        fullPage={!collapsedWelcome}
        onClickEnterButton={() => {
          setCollapsedWelcome(true);
        }}
      />
      {collapsedWelcome && (
        <Suspense fallback={<Loading />}>
          <DataDisplay />
        </Suspense>
      )}
    </div>
  );
}

export default App;
