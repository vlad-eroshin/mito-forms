import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Input } from './input';
import { Button } from './button';
import { Textarea } from './textarea';
import { Checkbox } from './checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { RadioGroup, RadioGroupItem } from './radio-group';

const meta: Meta<typeof Form> = {
  title: 'shadcn/primitives/Form',
  component: Form,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic form schema
const basicFormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.'
  })
});

// Profile form schema
const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.'
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.'
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.'
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Please enter a valid URL.' })
      })
    )
    .optional()
});

// Settings form schema
const settingsFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  notifications: z.boolean().default(false).optional(),
  theme: z.enum(['light', 'dark', 'system'], {
    required_error: 'Please select a theme.'
  }),
  language: z.string({
    required_error: 'Please select a language.'
  })
});

// Basic Form Example
export const BasicForm: Story = {
  render: () => {
    const form = useForm<z.infer<typeof basicFormSchema>>({
      resolver: zodResolver(basicFormSchema),
      defaultValues: {
        username: '',
        email: ''
      }
    });

    function onSubmit(values: z.infer<typeof basicFormSchema>) {
      console.log(values);
      alert('Form submitted! Check console for values.');
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormDescription>
                  We'll never share your email with anyone else.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  }
};

// Profile Form Example
export const ProfileForm: Story = {
  render: () => {
    const form = useForm<z.infer<typeof profileFormSchema>>({
      resolver: zodResolver(profileFormSchema),
      defaultValues: {
        username: '',
        email: '',
        bio: ''
      }
    });

    function onSubmit(values: z.infer<typeof profileFormSchema>) {
      console.log(values);
      alert('Profile updated! Check console for values.');
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name. It can be your real name or a pseudonym.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="user@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  You can manage verified email addresses in your email settings.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations to link to them.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update profile</Button>
        </form>
      </Form>
    );
  }
};

// Settings Form with Multiple Input Types
export const SettingsForm: Story = {
  render: () => {
    const form = useForm<z.infer<typeof settingsFormSchema>>({
      resolver: zodResolver(settingsFormSchema),
      defaultValues: {
        name: '',
        email: '',
        notifications: false,
        theme: 'light',
        language: ''
      }
    });

    function onSubmit(values: z.infer<typeof settingsFormSchema>) {
      console.log(values);
      alert('Settings saved! Check console for values.');
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notifications"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Email notifications
                  </FormLabel>
                  <FormDescription>
                    Receive emails about your account activity.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Theme</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="light" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Light
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="dark" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Dark
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="system" />
                      </FormControl>
                      <FormLabel className="font-normal">System</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="pt">Portuguese</SelectItem>
                    <SelectItem value="ru">Russian</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                    <SelectItem value="ko">Korean</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  This is the language that will be used in the dashboard.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Save settings</Button>
        </form>
      </Form>
    );
  }
};

// Simple Form without validation
export const SimpleForm: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      alert('Form submitted! Check console for values.');
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6 w-96">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Name
          </label>
          <Input
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange('name')}
          />
          <p className="text-muted-foreground text-sm">
            Your full name as it appears on your ID.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Email
          </label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange('email')}
          />
          <p className="text-muted-foreground text-sm">
            We'll use this to contact you about your submission.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Message
          </label>
          <Textarea
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange('message')}
          />
          <p className="text-muted-foreground text-sm">
            Tell us what you'd like to discuss.
          </p>
        </div>

        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>
    );
  }
};
