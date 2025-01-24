"use client"
import { useUserStore } from "@/lib/store/user-store"

export default function SettingsPage() {
  const { settings, updateSettings } = useUserStore()
  
  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold">Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Theme</label>
          <select 
            value={settings.theme}
            onChange={(e) => updateSettings({ theme: e.target.value as "light" | "dark" })}
            className="w-full p-2 border rounded"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
    </div>
  )
}
