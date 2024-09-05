import React from 'react'

export function LoadingSpinner() {
  return (
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 border-2 border-slate-200 rounded-full"></div>
      <div className="absolute inset-0 border-t-2 border-slate-700 rounded-full animate-spin"></div>
      <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
      </div>
    </div>
  )
}