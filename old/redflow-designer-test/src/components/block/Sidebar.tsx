/*

import { LayoutTemplate, Grid2X2Check, Grid2X2 } from "lucide-react";
import { Badge, Tabs, TabsContent, TabsList, TabsTrigger, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/ui";
import Menubar from "./Menubar";

const tabConfig = [
  {
    value: "tab-1", icon: LayoutTemplate, tooltip: "Class",
    content: <Menubar />,
  }, {
    value: "tab-2", icon: Grid2X2Check, tooltip: "Widgets",
    content: (<p className="text-muted-foreground px-4 py-3 text-xs">Content for Tab 2</p>),
  }, {
    value: "tab-3", icon: Grid2X2, tooltip: "Blocks", badge: 10,
    content: (<p className="text-muted-foreground px-4 py-3 text-xs">Content for Tab 3</p>),
  },
];

export default function Sidebar ()
{
  return (
    <Tabs defaultValue="tab-1" orientation="vertical" className="w-full flex-row">
      <TabsList className="flex-col">
        {tabConfig.map(({ value, icon: Icon, tooltip, badge }) => (
          <TooltipProvider key={value} delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <TabsTrigger value={value} className="group p-2">
                    <span className="relative">
                      <Icon size={16} aria-hidden="true" />
                      {badge && (
                        <Badge className="border-background absolute -top-2.5 left-full min-w-4 -translate-x-1.5 px-0.5 text-[10px]/[.875rem] transition-opacity group-data-[state=inactive]:opacity-50">
                          {badge}
                        </Badge>
                      )}
                    </span>
                  </TabsTrigger>
                </span>
              </TooltipTrigger>
              <TooltipContent side="right" className="px-2 py-1 text-xs">
                {tooltip}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </TabsList>
      <div className="rounded-md border w-full bg-for">
        {tabConfig.map(({ value, content }) => (
          <TabsContent key={value} value={value}>
            {content}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}

*/