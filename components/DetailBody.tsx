import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DetailBody: React.FC = () => {
  return (
    <div className="flex flex-col itesm-start flex-1 gap-5">
      <Card className="flex flex-col w-full items-start gap-4 p-5 pt-2.5 rounded-xl border bg-card shadow">
        <CardContent className="p-0 w-full">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 p-0 w-full">
          <Button
            variant="outline"
            className="px-4 py-2 border rounded-md shadow text-primary text-sm"
          >
            Cancel
          </Button>
          <Button className="px-4 py-2 border rounded-md shadow text-primary-foreground text-sm bg-[#0786FD]">
            Deploy
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DetailBody;
