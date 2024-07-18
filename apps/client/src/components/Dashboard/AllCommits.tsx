import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const AllCommits = ({ className }: { className?: string }) => {
  return (
    <div className={cn("", className)}>
      <h4 className="text-xl font-semibold text-center">All Commits</h4>
      <ScrollArea className="h-[95%]">
        <div className="p-4">
          <h5 className="text-xl font-semibold" >Commit: Name of the commit</h5>
          <p className="text-sm">
            Description: Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Ipsum tenetur, porro reiciendis ad velit repellendus possimus
            facilis veritatis voluptatem sed.
          </p>
          <Separator className="my-4" />
        </div>
        <div className="p-4">
          <h5 className="text-xl font-semibold" >Caommit: Name of the commit</h5>
          <p className="text-sm">
            Description: Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Ipsum tenetur, porro reiciendis ad velit repellendus possimus
            facilis veritatis voluptatem sed.
          </p>
          <Separator className="my-2" />
        </div>
        <div className="p-4">
          <h5 className="text-xl font-semibold" >Caommit: Name of the commit</h5>
          <p className="text-sm">
            Description: Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Ipsum tenetur, porro reiciendis ad velit repellendus possimus
            facilis veritatis voluptatem sed.
          </p>
          <Separator className="my-2" />
        </div>
        <div className="p-4">
          <h5 className="text-xl font-semibold" >Caommit: Name of the commit</h5>
          <p className="text-sm">
            Description: Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Ipsum tenetur, porro reiciendis ad velit repellendus possimus
            facilis veritatis voluptatem sed.
          </p>
          <Separator className="my-2" />
        </div>
        <div className="p-4">
          <h5 className="text-xl font-semibold" >Caommit: Name of the commit</h5>
          <p className="text-sm">
            Description: Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Ipsum tenetur, porro reiciendis ad velit repellendus possimus
            facilis veritatis voluptatem sed.
          </p>
          <Separator className="my-2" />
        </div>
        <div className="p-4">
          <h5 className="text-xl font-semibold" >Caommit: Name of the commit</h5>
          <p className="text-sm">
            Description: Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Ipsum tenetur, porro reiciendis ad velit repellendus possimus
            facilis veritatis voluptatem sed.
          </p>
          <Separator className="my-2" />
        </div>
      </ScrollArea>
    </div>
  );
};

export default AllCommits;
