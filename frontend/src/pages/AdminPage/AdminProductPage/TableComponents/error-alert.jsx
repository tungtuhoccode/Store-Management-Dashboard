import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"



export function ErrorAlert({
  title = "Something went wrong",
  message = "We couldn't load the data. Please try again.",
  onRetry,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "w-full max-w-md mx-auto rounded-lg border border-destructive/20 bg-destructive/5 p-6 shadow-sm",
        className,
      )}
    >
      <div className="flex flex-col items-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircle className="h-6 w-6" />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-destructive">{title}</h3>

        <p className="mt-2 text-sm text-destructive/80">{message}</p>

        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="mt-4 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>
    </motion.div>
  )
}
