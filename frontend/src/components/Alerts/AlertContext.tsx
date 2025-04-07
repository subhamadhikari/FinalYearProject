import { createContext, useState,ReactNode } from "react";
import { Alert, AlertsWrapper } from "./Alert";
import { AlertType } from "../../types/alert";

type Children = {
    children: ReactNode
}

export const AlertsContext = createContext<any>("");

const AlertsProvider = ({ children }:Children) => {
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  const addAlert = (alert:AlertType) => {
    const id = Math.random().toString(36).slice(2, 9) + new Date().getTime().toString(36);
    setAlerts((prev) => [{ ...alert, id: id }, ...prev]);
    return id;
  }

  const dismissAlert = (id:string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }

  return (
    <AlertsContext.Provider value={{ alerts, addAlert, dismissAlert }}>
      <AlertsWrapper>
        {alerts.map((alert) => (
          <Alert key={alert.id} {...alert} handleDismiss={() => {dismissAlert(alert.id)}} />
        ))}
      </AlertsWrapper>
      {children}
    </AlertsContext.Provider>
  );
};

export default AlertsProvider;