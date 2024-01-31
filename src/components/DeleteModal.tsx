import React from "react";
import {
    Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

function DeleteModal({ deleteBlog, id }: any) {
  return (
    <Dialog>
      {/* open={open} onOpenChange={setOpen} */}
      <DialogTrigger asChild>
        <button className="rounded-lg border border-black w-full flex justify-center ms-2 bg-white px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-slate-200 hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800">
          <Trash2 color="#ef4444" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete blog</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this blog?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button
            style={{ backgroundColor: "#f43f5e" }}
            className="bg-rose-500 py-3 text-white transition hover:bg-rose-600 hover:opacity-80"
            type="submit"
            onClick={() => deleteBlog(id)}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteModal;
