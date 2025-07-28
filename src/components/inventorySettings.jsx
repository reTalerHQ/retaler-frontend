import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export const InventorySettings = () => {
  const [stockAlert, setStockAlert] = useState({
    lowStock: "",
    criticalLowStock: "",
  });
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [criticalLowStockAlerts, setCriticalLowStockAlerts] = useState(true);
  const [editedData, setEditedData] = useState(stockAlert);
  const [isSaving, setIsSaving] = useState(false);
  const handleSave = async () => {
    setIsSaving(true);
    // simulate/save to backend
    setStockAlert(editedData);
    setIsSaving(false);
    setEditedData(editedData); // ensures hasChanges is false, button returns to secondary
  };

  const hasStockLimitChanges =
    JSON.stringify(stockAlert) !== JSON.stringify(editedData);
  const canSave = hasStockLimitChanges && !isSaving;
  return (
    <>
      <div className="flex flex-col justify-between gap-3 lg:flex-col">
        <h1 className="text-lg font-bold lg:text-2xl">Inventory</h1>
        <div className="flex w-full flex-col justify-between gap-3 md:w-[50vw] md:max-w-[50vw] lg:flex-col">
          <section className="flex flex-col gap-4 rounded-xl border bg-white px-4 py-4">
            <div className="flex flex-col gap-5">
              <div className="flex flex-row">
                <h2 className="text-md font-semibold">
                  Low Stock Alert Threshold
                  <p className="text-sm font-normal text-gray-500">
                    Get notified when product stock falls below this number
                  </p>
                </h2>
                <div className="ml-auto">
                  <Switch
                    thumbSize="size-5"
                    trackWidth="w-10"
                    trackHeight="h-6"
                    checked={lowStockAlerts}
                    onCheckedChange={setLowStockAlerts}
                  />
                </div>
              </div>
              {lowStockAlerts && (
                <div className="text-base font-semibold">
                  <Input
                    label="Set Low Stock Limit"
                    type="number"
                    value={editedData.lowStock}
                    onChange={(e) =>
                      setEditedData({ ...editedData, lowStock: e.target.value })
                    }
                    onFocus={(e) => e.target.select()}
                    placeholder="Enter Low Stock Limit"
                  />
                </div>
              )}
            </div>
          </section>
          <section className="flex w-full flex-col gap-4 rounded-xl border bg-white px-4 py-4">
            <div className="flex flex-col gap-5">
              <div className="flex flex-row">
                <h2 className="text-md font-semibold">
                  Critical Stock Threshold
                  <p className="text-sm font-normal text-gray-500">
                    Urgent alerts when stock is critically low
                  </p>
                </h2>
                <div className="ml-auto">
                  <Switch
                    thumbSize="size-5"
                    trackWidth="w-10"
                    trackHeight="h-6"
                    checked={criticalLowStockAlerts}
                    onCheckedChange={setCriticalLowStockAlerts}
                  />
                </div>
              </div>
              {criticalLowStockAlerts && (
                <div className="text-base font-semibold">
                  <Input
                    label="Set Critical Stock Limit"
                    type="number"
                    value={editedData.criticalLowStockStock}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        criticalLowStock: e.target.value,
                      })
                    }
                    onFocus={(e) => e.target.select()}
                    placeholder="Enter Critical Stock Limit"
                  />
                </div>
              )}
            </div>
          </section>
          <Button
            variant={canSave ? "default" : "secondary"}
            onClick={handleSave}
            className={`w-[140px] min-w-[120px] ${canSave ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"} mt-4 self-end`}
          >
            Save Settings
          </Button>
        </div>
      </div>
    </>
  );
};
