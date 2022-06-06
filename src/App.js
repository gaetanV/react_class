import "./App.css";

import DOM from "dom-mobile/src/app/lib/DOM.export";
import { PanelY } from "./Modules/Panel/Component/PanelY/PanelY";
import { PanelX } from "./Modules/Panel/Component/PanelX/PanelX";

import { BlocFull } from "./Modules/Panel/Component/PanelY/Component/BlocFull";
import { BlocScroll } from "./Modules/Panel/Component/PanelY/Component/BlocScroll";
import { CranProvider } from "./Modules/Panel/Context/CranContext";
import { MenuCran } from "./Component/MenuCran/MenuCran";

import chaise from "./Assets/chaise.png";
import lit from "./Assets/lit.png";
import soupe from "./Assets/soupe.png";
import bear from "./Assets/bear.jpg";
import forest from "./Assets/forest.png";
import theend from "./Assets/theend.png";

DOM.extend(HTMLElement);

function App() {
  return (
    <div>
      <CranProvider synch={{ panelA: ["panelB"], panelB: ["panelA"] }}>
        <MenuCran idCran="panel-menu" />
        <div id="panelDemo">
          <PanelX id="panel-menu">
            <PanelY id="panelA">
              <BlocFull>
                <div className="flexBox">
                  <div style={{ color: "#FEF7E5", backgroundColor: "#201C21" }}>
                    <div className="center">
                      <p style={{ maxWidth: "400px" }}>
                        La petite Boucle d’or se promène dans la forêt quand
                        elle aperçoit une maison .<br /> <br />
                        Pleine de curiosité elle décide d’y entrer…
                      </p>
                    </div>
                  </div>
                  <div>
                    <div
                      className="coverImage"
                      style={{ backgroundImage: `url("${forest}")` }}
                    ></div>
                  </div>
                </div>
              </BlocFull>
              <BlocScroll>
                <div className="center">
                  <div className="lecture">
                    <p>
                      <img alt="icon soupe" className="icon" src={soupe}></img>
                      Boucle d’or va alors goûter tour à tour les trois soupes
                      sur la table . La plus petite des soupes etait tellement à
                      son goût qu'elle la mangea jusqu'à la dernière goutte.
                    </p>
                    <p>
                      <img
                        alt="icon chaise"
                        className="icon"
                        src={chaise}
                      ></img>
                      Ensuite elle voulut s'asseoir. Elle s'assit alors sur la
                      petite chaise, mais comme Boucle d'Or était trop lourde,
                      elle la cassa.
                    </p>
                    <p>
                      <b>
                        "Ce n'est pas grave, se dit-elle, continuons la visite".
                      </b>
                    </p>
                    <p>
                      <img alt="icon lit" className="icon" src={lit}></img>
                      Enfin elle se coucha sur le petit lit et elle le trouva
                      tout à fait comme il faut alors elle s'y endormit.
                    </p>
                  </div>
                </div>
              </BlocScroll>
              <BlocFull>
                <div
                  className="center"
                  style={{ backgroundColor: "#FEC4C7", color: "#3A3A56" }}
                >
                  <p>
                    Boucle d'Or, réveillée par la voix des ours, ouvrit les yeux
                    et vit les trois ours penchés au-dessus d'elle. <br />
                    <br />
                    Elle eut très peur et, voyant la fenêtre ouverte, elle s'y
                    précipita et sauta par dessus pour courir vite jusque chez
                    elle!.
                  </p>
                </div>
              </BlocFull>
              <BlocFull>
                <div
                  className="coverImage"
                  style={{ backgroundImage: `url("${theend}")` }}
                ></div>
              </BlocFull>
            </PanelY>
            <PanelY id="panelB">
              <BlocFull>
                <div className="flexBox">
                  <div style={{ backgroundColor: "#F3F3F5", color: "#554842" }}>
                    <div className="center">
                      <p style={{ maxWidth: "400px" }}>
                        Les trois ours, comme ils avaient terminé leur petite
                        promenade, rentrèrent à la maison.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div
                      className="coverImage"
                      style={{ backgroundImage: `url("${bear}")`}}
                    ></div>
                  </div>
                </div>
              </BlocFull>
              <BlocScroll>
                <div className="center">
                  <div className="lecture">
                    <p>
                      <img alt="icon soupe" className="icon" src={soupe}></img>
                      Le petit ours regardant son bol dit: "quelqu'un a mangé
                      toute ma soupe!!"
                    </p>
                    <p>
                      <img
                        alt="icon chaise"
                        className="icon"
                        src={chaise}
                      ></img>
                      Puis s'approchant en pleurnicha: "quelqu'un a cassé ma
                      chaise!!"
                    </p>
                    <p>
                      <b>
                        D'un pas décidé le grand ours se dirigea vers l'escalier
                        qu'il grimpa quatre à quatre suivi par le moyen ours et
                        par le petit ours qui séchait ses larmes.
                      </b>
                    </p>
                    <p>
                      <img alt="icon lit" className="icon" src={lit}></img>
                      Et le petit ours alors s'étonna: "Il y a quelqu'un sur mon
                      lit!!"
                    </p>
                  </div>
                </div>
              </BlocScroll>
              <BlocFull>
                <div
                  className="center"
                  style={{ backgroundColor: "#FEC4C7", color: "#3A3A56" }}
                >
                  <p>
                    Boucle d'Or sauta par la fenêtre, petit ours ne la revit
                    plus jamais.
                  </p>
                </div>
              </BlocFull>
              <BlocFull>
                <div
                  className="coverImage"
                  style={{ backgroundImage: `url("${theend}")` }}
                ></div>
              </BlocFull>
            </PanelY>
          </PanelX>
        </div>
      </CranProvider>
    </div>
  );
}

export default App;
