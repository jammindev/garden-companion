import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"

const ActionButton = ({isLoading}) => {
    return (
        <Button
        className="mx-auto"
        type="submit"
        disabled={isLoading}
      >
        {isLoading &&  <Loader2 className="animate-spin mr-3" />}
        Valider
    </Button>
    )
}

export default ActionButton