import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'shadcn/primitives/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The default active tab'
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the tabs'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic tabs example
export const Default: Story = {
  render: (args) => (
    <Tabs defaultValue="account" className="w-[400px]" {...args}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="space-y-2">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Account Settings</h3>
          <p className="text-sm text-muted-foreground">
            Make changes to your account here. Click save when you're done.
          </p>
        </div>
        <div className="space-y-2">
          <div className="space-y-1">
            <label className="text-sm font-medium">Name</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              defaultValue="Pedro Duarte"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Username</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              defaultValue="@peduarte"
            />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="password" className="space-y-2">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Password</h3>
          <p className="text-sm text-muted-foreground">
            Change your password here. After saving, you'll be logged out.
          </p>
        </div>
        <div className="space-y-2">
          <div className="space-y-1">
            <label className="text-sm font-medium">Current password</label>
            <input
              type="password"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">New password</label>
            <input
              type="password"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
};

// Multiple tabs
export const MultipleTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4">
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold mb-2">Overview</h3>
          <p className="text-sm text-muted-foreground">
            This is the overview tab content. Here you can see a summary of your data.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="mt-4">
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold mb-2">Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Analytics data and charts would be displayed here.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="reports" className="mt-4">
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold mb-2">Reports</h3>
          <p className="text-sm text-muted-foreground">
            Generate and view reports in this section.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="notifications" className="mt-4">
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold mb-2">Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Manage your notification preferences here.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
};

// Vertical tabs
export const VerticalTabs: Story = {
  render: () => (
    <Tabs defaultValue="general" orientation="vertical" className="flex w-[600px]">
      <TabsList className="flex flex-col h-auto w-48 mr-4">
        <TabsTrigger value="general" className="w-full justify-start">
          General
        </TabsTrigger>
        <TabsTrigger value="security" className="w-full justify-start">
          Security
        </TabsTrigger>
        <TabsTrigger value="integrations" className="w-full justify-start">
          Integrations
        </TabsTrigger>
        <TabsTrigger value="support" className="w-full justify-start">
          Support
        </TabsTrigger>
        <TabsTrigger value="organizations" className="w-full justify-start">
          Organizations
        </TabsTrigger>
        <TabsTrigger value="advanced" className="w-full justify-start">
          Advanced
        </TabsTrigger>
      </TabsList>
      <div className="flex-1">
        <TabsContent value="general">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">General Settings</h3>
            <p className="text-sm text-muted-foreground">
              Configure your general account settings and preferences.
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Display Name</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                defaultValue="John Doe"
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="security">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Security Settings</h3>
            <p className="text-sm text-muted-foreground">
              Manage your account security and authentication methods.
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Two-Factor Authentication</label>
              <div className="flex items-center space-x-2">
                <input type="checkbox" />
                <span className="text-sm">Enable 2FA</span>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="integrations">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Integrations</h3>
            <p className="text-sm text-muted-foreground">
              Connect and manage third-party integrations.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="support">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <p className="text-sm text-muted-foreground">
              Get help and contact support.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="organizations">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Organizations</h3>
            <p className="text-sm text-muted-foreground">
              Manage your organization settings and members.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="advanced">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Advanced Settings</h3>
            <p className="text-sm text-muted-foreground">
              Advanced configuration options for power users.
            </p>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  )
};

// Disabled tab
export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab1">Available</TabsTrigger>
        <TabsTrigger value="tab2" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="tab3">Another Tab</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-4">
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold mb-2">Available Tab</h3>
          <p className="text-sm text-muted-foreground">
            This tab is available and can be clicked.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab2" className="mt-4">
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold mb-2">Disabled Tab</h3>
          <p className="text-sm text-muted-foreground">
            This content won't be shown because the tab is disabled.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab3" className="mt-4">
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold mb-2">Another Tab</h3>
          <p className="text-sm text-muted-foreground">
            This is another available tab with its own content.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
};

// Controlled tabs with state
export const ControlledTabs: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState('step1');

    const nextStep = () => {
      if (activeTab === 'step1') setActiveTab('step2');
      else if (activeTab === 'step2') setActiveTab('step3');
    };

    const prevStep = () => {
      if (activeTab === 'step3') setActiveTab('step2');
      else if (activeTab === 'step2') setActiveTab('step1');
    };

    return (
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[500px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="step1">Step 1</TabsTrigger>
          <TabsTrigger value="step2">Step 2</TabsTrigger>
          <TabsTrigger value="step3">Step 3</TabsTrigger>
        </TabsList>
        <TabsContent value="step1" className="mt-4">
          <div className="rounded-lg border p-4 space-y-4">
            <h3 className="text-lg font-semibold">Step 1: Basic Information</h3>
            <p className="text-sm text-muted-foreground">
              Enter your basic information to get started.
            </p>
            <div className="flex justify-end">
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm"
              >
                Next
              </button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="step2" className="mt-4">
          <div className="rounded-lg border p-4 space-y-4">
            <h3 className="text-lg font-semibold">Step 2: Configuration</h3>
            <p className="text-sm text-muted-foreground">
              Configure your preferences and settings.
            </p>
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-4 py-2 border border-input rounded-md text-sm"
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm"
              >
                Next
              </button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="step3" className="mt-4">
          <div className="rounded-lg border p-4 space-y-4">
            <h3 className="text-lg font-semibold">Step 3: Review</h3>
            <p className="text-sm text-muted-foreground">
              Review your information and complete the setup.
            </p>
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-4 py-2 border border-input rounded-md text-sm"
              >
                Previous
              </button>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
                Complete
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    );
  }
};
