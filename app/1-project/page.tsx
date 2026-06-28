"use client"
import { Button } from '@/components/ui/button'
import React, { useState,useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { AlertCircleIcon } from "lucide-react"
import { AlertTriangleIcon } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"


function page() {
    
    const[count,setCount]=useState(0)
    const [diff,setDiff] =useState(1)
    const [checked, setChecked] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const refName = useRef<HTMLSpanElement | null>(null);
    const popup = () => {
      const el = refName.current
      if (!el) return
      el.classList.add('label-glow')
      el.classList.add('count-glow')
      setTimeout(() => el.classList.remove('label-glow'), 1500)
      setTimeout(() => el.classList.remove('count-glow'), 1500)
    }
    const inc=()=>{
        setCount((c) => c + diff);

      }
    const dec=()=>{
      if (!checked && count - diff < 0) {
        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 5000)
          popup()

        return
      }

      setCount((c) => c - diff)
      }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">

      <div className='absolute top-3 right-5'>
          {showAlert && (
            <div
              className="glow-vibrate"
              style={{
                transition: 'transform 340ms cubic-bezier(.2,.8,.2,1), opacity 340ms ease',
                transform: 'translateY(-8px) scale(0.98)',
                opacity: 0,
                animation: 'alert-in 360ms forwards cubic-bezier(.2,.8,.2,1)'
              }}
            >
              <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
                <AlertTriangleIcon />
                <AlertTitle>Cannot decrement</AlertTitle>
                <AlertDescription>
                 Enable negative annotation to go below zero.
                </AlertDescription>
              </Alert>
            </div>
          )}
        
        <style jsx>{`
          @keyframes alert-in {
            0% { transform: translateY(-8px) scale(0.98); opacity: 0 }
            60% { transform: translateY(6px) scale(1.02); opacity: 1 }
            100% { transform: translateY(0) scale(1); opacity: 1 }
          }
        `}</style>
      </div>
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-lg sm:p-8">
        {/* {showAlert && (
          // <Alert variant="destructive" className="mb-4">
          //   <AlertCircleIcon className="h-4 w-4" />
          //   <AlertTitle>Cannot decrement</AlertTitle>
          //   <AlertDescription>
          //     Enable negative annotation to go below zero.
          //   </AlertDescription>
          // </Alert>


            <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
      <AlertTriangleIcon />
      <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
      <AlertDescription>
        Renew now to avoid service interruption or upgrade to a paid plan to
        continue using the service.
      </AlertDescription>
    </Alert> 

        )}*/}
        <div className="space-y-3 flex  text-center sm:text-left justify-center ">
          <h1 className="text-5xl count-glow"> {count}</h1>
        </div>
        <div className="flex flex-row justify-between mx-auto my-5">
          <Input
            className=" w-20"
            value={diff}
            onChange={(e) => {
              setDiff(Number(e.target.value));
            }}
          />
          <FieldGroup className="m-auto w-50 flex justify-center items-center">
            <Field orientation="horizontal" data-disabled>
              <Checkbox
                id="toggle-checkbox-disabled"
                name="toggle-checkbox-disabled"
                 checked={checked}
                 onCheckedChange={(value)=>setChecked(!!value)}
                      />
              <FieldLabel htmlFor="toggle-checkbox-disabled" >
                <span ref={refName}>negative annotation</span>
             
              </FieldLabel>
            </Field>
          </FieldGroup>

          <Button onClick={()=>{setCount(0)}}>reset</Button>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            className="w-full sm:flex-1"
            onClick={() => {
             inc()
            }}
          >
            increment
          </Button>
          <Button variant="outline" className="w-full sm:flex-1" 
              onClick={() => {
             dec()
            }}
          >
            decrement
          </Button>
        </div>
        <style jsx>{`
          .glow-vibrate {
            filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.55));
            animation:
              alert-in 360ms forwards cubic-bezier(.2,.8,.2,1),
              glow-pulse 1.4s ease-in-out infinite,
              vibrate 0.12s linear infinite;
          }

          .count-glow {
            text-shadow:
              0 0 6px rgba(59, 130, 246, 0.35),
              0 0 16px rgba(59, 130, 246, 0.25);
            animation: count-pulse 1.8s ease-in-out infinite;
          }

          .label-glow {
            /* modern filled gradient text with subtle glow */
            color: transparent;
            background: linear-gradient(90deg, #f97316 0%, #fb923c 40%, #f59e0b 70%);
            -webkit-background-clip: text;
            background-clip: text;
            text-shadow: 0 6px 18px rgba(245,158,11,0.12), 0 2px 6px rgba(249,115,22,0.08);
            filter: drop-shadow(0 6px 18px rgba(251, 191, 36, 0.12));
            transition: filter 300ms ease, text-shadow 300ms ease, color 300ms ease;
          }

          @keyframes alert-in {
            0% { transform: translateY(-8px) scale(0.98); opacity: 0 }
            60% { transform: translateY(6px) scale(1.02); opacity: 1 }
            100% { transform: translateY(0) scale(1); opacity: 1 }
          }

          @keyframes glow-pulse {
            0%, 100% {
              filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.45));
            }
            50% {
              filter: drop-shadow(0 0 18px rgba(251, 191, 36, 0.9));
            }
          }

          @keyframes vibrate {
            0% { transform: translate(0, 0) }
            25% { transform: translate(-1px, 1px) }
            50% { transform: translate(1px, -1px) }
            75% { transform: translate(-1px, -1px) }
            100% { transform: translate(1px, 1px) }
          }

          @keyframes count-pulse {
            0%, 100% {
              transform: scale(1);
              text-shadow:
                0 0 6px rgba(59, 130, 246, 0.35),
                0 0 16px rgba(59, 130, 246, 0.25);
            }
            50% {
              transform: scale(1.04);
              text-shadow:
                0 0 10px rgba(59, 130, 246, 0.6),
                0 0 24px rgba(59, 130, 246, 0.45);
            }
          }
        `}</style>
      </div>
    </main>
  );
}

export default page