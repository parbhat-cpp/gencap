import Loader from "./Loader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface LoaderDialogProps {
  open: boolean;
  title: string;
  description?: string;
}

const LoaderDialog = (props: LoaderDialogProps) => {
  return <Dialog open={props.open}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogDescription>
          {props.description}
        </DialogDescription>
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      </DialogHeader>
    </DialogContent>
  </Dialog>

}

export default LoaderDialog
