import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { ThemeProvider } from "@material-ui/styles";

import MuiTheme from "./theme";

// Layout Blueprints

import { LeftSidebar, PresentationLayout } from "./layout-blueprints";

// Example Pages

import Buttons from "./example-pages/Buttons";
import Dropdowns from "./example-pages/Dropdowns";
import TransactionList from "./app-components/TransactionList";
import AgenceList from "./app-components/AgenceList";
import EmployeList from "./app-components/EmployeList";

const Dashboard = lazy(() => import("./app-components/Dashboard"));

const DashboardDefault = lazy(() => import("./example-pages/DashboardDefault"));

const LandingPage = lazy(() => import("./example-pages/LandingPage"));

const Routes = () => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 1.01,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  };

  return (
    <ThemeProvider theme={MuiTheme}>
      <AnimatePresence>
        <Suspense
          fallback={
            <div className="d-flex align-items-center vh-100 justify-content-center text-center font-weight-bold font-size-lg py-3">
              <div className="w-50 mx-auto">Loading .... </div>
            </div>
          }
        >
          <Switch>
            <Redirect exact from="/" to="/LandingPage" />
            <Route path={["/LandingPage"]}>
              <PresentationLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Route path="/LandingPage" component={LandingPage} />
                  </motion.div>
                </Switch>
              </PresentationLayout>
            </Route>

            <Route
              path={[
                "/dashboard",
                "/transaction",
                "/agence",
                "/employe",
                "/DashboardDefault",
                "/Buttons",
              ]}
            >
              <LeftSidebar>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/transaction" component={TransactionList} />
                    <Route path="/agence" component={AgenceList} />
                    <Route path="/employe" component={EmployeList} />

                    <Route
                      path="/DashboardDefault"
                      component={DashboardDefault}
                    />
                    <Route path="/Buttons" component={Buttons} />
                    <Route path="/Dropdowns" component={Dropdowns} />
                  </motion.div>
                </Switch>
              </LeftSidebar>
            </Route>
          </Switch>
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Routes;
