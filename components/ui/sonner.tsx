"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      // الموقع دا Dark-only أصلاً (className="dark" على الـ html)
      // فبنثبّت الـ theme على dark عشان الـ Toasts تفضل متوافقة مع التصميم
      // حتى لو نظام المستخدم Light — وده بيضمن الـ Contrast المطلوب
      theme="dark"
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "#0c0c0e",
          "--normal-text": "oklch(0.985 0 0)",
          "--normal-border": "oklch(1 0 0 / 14%)",
          "--normal-bg-hover": "oklch(1 0 0 / 8%)",
          "--success-bg": "#0c0c0e",
          "--success-text": "oklch(0.8 0.15 150)",
          "--success-border": "oklch(0.7 0.15 150 / 35%)",
          "--info-bg": "#0c0c0e",
          "--info-text": "oklch(0.7 0.15 270)",
          "--info-border": "oklch(0.7 0.15 270 / 35%)",
          "--warning-bg": "#0c0c0e",
          "--warning-text": "oklch(0.8 0.13 85)",
          "--warning-border": "oklch(0.75 0.13 85 / 35%)",
          "--error-bg": "#0c0c0e",
          "--error-text": "oklch(0.7 0.2 25)",
          "--error-border": "oklch(0.7 0.2 25 / 35%)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
