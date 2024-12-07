import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const App = () => {
  const [clipboardHistory] = useState<string[]>([
    "Lorem ipsum dolor sit amet consectetur ",
    "Lorem ipsum dolor sit amet consectetur ",
  ]);

  useEffect(() => {
    // chrome.storage.local.get("clipboardHistory", (data) => {
    //   setClipboardHistory(data.clipboardHistory || []);
    // });
  }, []);

  return (
    <div className="p-4 h-100 w-68">
      <h3 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-3">
        Clipboard
      </h3>
      <ScrollArea className="h-72 w-60 rounded-md border mb-3">
        <div className="p-4">
          {clipboardHistory.length > 0 ? (
            <ul className="mb-4">
              {clipboardHistory.map((item, index) => (
                <Textarea
                  className="mb-2 h-16"
                  key={index}
                  placeholder="Type your message here."
                >
                  {item}
                </Textarea>
              ))}
            </ul>
          ) : (
            <p>No clipboard history available.</p>
          )}
        </div>
      </ScrollArea>
      <Button className="border" variant="ghost">
        Clear
      </Button>
    </div>
  );
};

export default App;
