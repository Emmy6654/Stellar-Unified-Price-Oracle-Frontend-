import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ErrorBoundary } from './ErrorBoundary'

function ThrowError({ message }: { message: string }): React.ReactElement {
  throw new Error(message)
}

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
}

export default meta
type Story = StoryObj<typeof ErrorBoundary>

export const Normal: Story = {
  render: () => (
    <ErrorBoundary>
      <div className="text-gray-300 p-4">Normal content inside error boundary</div>
    </ErrorBoundary>
  ),
}

export const ErrorState: Story = {
  render: () => (
    <ErrorBoundary>
      <ThrowError message="Network request failed with status 500" />
    </ErrorBoundary>
  ),
}

export const CustomFallback: Story = {
  render: () => (
    <ErrorBoundary
      fallback={
        <div className="flex items-center justify-center min-h-[200px] bg-gray-900 rounded-xl p-8">
          <div className="text-center">
            <p className="text-red-400 font-medium mb-2">Custom error display</p>
            <p className="text-gray-500 text-sm">This is a custom fallback component</p>
          </div>
        </div>
      }
    >
      <ThrowError message="Something broke" />
    </ErrorBoundary>
  ),
}
