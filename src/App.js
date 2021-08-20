import React from "react";
import { Switch, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Palette from "./pages/Palette";
import PaletteList from "./pages/PaletteList";
import Page from "./pages/Page";
import SingleColorPalette from "./pages/SingleColorPalette";
import NewPaletteForm from "./pages/NewPaletteForm";
import seedColors from "./utils/seedColors";
import { generatePalette } from "./utils/colorHelpers";
import "./App.css";

const newPalettes = JSON.parse(localStorage.getItem("palettes")) || seedColors;

function App() {
  const [palettes, setPalettes] = React.useState(newPalettes);

  React.useEffect(() => {
    localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

  function findPalette(id) {
    return palettes.find((palette) => palette.id === id);
  }

  const deletePalette = (id) => {
    setPalettes(
      (palettes) => (palettes = palettes.filter((el) => el.id !== id))
    );
  };

  const savePalette = (newPalette) => {
    setPalettes((palette) => [...palette, newPalette]);
  };

  return (
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="page" timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path="/"
                render={(routeProps) => (
                  <Page>
                    <PaletteList
                      palettes={palettes}
                      deletePalette={deletePalette}
                      {...routeProps}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/new"
                render={(routeProps) => (
                  <Page>
                    <NewPaletteForm
                      savePalette={savePalette}
                      palettes={palettes}
                      {...routeProps}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/:id"
                render={(routeProps) => (
                  <Page>
                    <Palette
                      {...routeProps}
                      palette={generatePalette(
                        findPalette(routeProps.match.params.id)
                      )}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/:paletteId/:colorId"
                render={(routeProps) => (
                  <Page>
                    <SingleColorPalette
                      {...routeProps}
                      colorId={routeProps.match.params.colorId}
                      palette={generatePalette(
                        findPalette(routeProps.match.params.paletteId)
                      )}
                    />
                  </Page>
                )}
              />

              <Route
                render={(routeProps) => (
                  <Page>
                    <PaletteList
                      palettes={palettes}
                      deletePalette={deletePalette}
                      {...routeProps}
                    />
                  </Page>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
}

export default App;
