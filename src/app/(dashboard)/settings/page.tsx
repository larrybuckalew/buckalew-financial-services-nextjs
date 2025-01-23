"use client"

import { Card } from "@/components/ui/card"
import { useUserStore } from "@/lib/store/user-store"

export default function SettingsPage() {
 const { settings, updateSettings } = useUserStore()

 return (
   <div className="space-y-6">
     <h2 className="text-3xl font-bold">Settings</h2>
     
     <Card className="p-6">
       <div className="space-y-4">
         <div>
           <label className="block text-sm font-medium mb-1">Theme</label>
           <select 
             value={settings.theme}
             onChange={(e) => updateSettings({ theme: e.target.value as "light" | "dark" })}
             className="w-full rounded-md border p-2"
           >
             <option value="light">Light</option>
             <option value="dark">Dark</option>
           </select>
         </div>

         <div>
           <label className="block text-sm font-medium mb-1">Currency</label>
           <select
             value={settings.currency}
             onChange={(e) => updateSettings({ currency: e.target.value })}
             className="w-full rounded-md border p-2"
           >
             <option value="USD">USD ($)</option>
             <option value="EUR">EUR (€)</option>
             <option value="GBP">GBP (£)</option>
           </select>
         </div>

         <div>
           <label className="flex items-center gap-2">
             <input
               type="checkbox"
               checked={settings.notifications}
               onChange={(e) => updateSettings({ notifications: e.target.checked })}
               className="rounded"
             />
             <span className="text-sm font-medium">Enable Notifications</span>
           </label>
         </div>
       </div>
     </Card>
   </div>
 )
}
