import React from 'react'

const HabitCard = () => {
  return (
    <div class="rounded-lg border bg-card text-card-foreground shadow-md w-full max-w-md mb-5" data-v0-t="card">
      <div class="flex flex-col space-y-1.5 p-6">
        <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Meditate Daily</h3>
      </div>
      <div class="p-6 space-y-4">
        <p>Establish a daily meditation practice to reduce stress, improve focus, and cultivate inner peace.</p>
        <div class="flex items-center space-x-4">
          <span class="text-sm font-medium">Contributors:</span>
          <div class="flex -space-x-2">
            <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">JD</span>
            </span>
            <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">SM</span>
            </span>
            <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">LW</span>
            </span>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <span class="text-sm font-medium">Frequency:</span>
            <p>Daily</p>
          </div>
          <div>
            <span class="text-sm font-medium">Duration:</span>
            <p>10-20 minutes</p>
          </div>
          <div>
            <span class="text-sm font-medium">Start Date:</span>
            <p>January 1, 2023</p>
          </div>
          <div>
            <span class="text-sm font-medium">Last Updated:</span>
            <p>April 15, 2023</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HabitCard