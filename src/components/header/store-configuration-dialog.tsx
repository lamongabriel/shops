import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManagedRestaurant,
  GetManagedRestaurantResponse,
} from '@/api/get-managed-restaurant'
import { updateProfile } from '@/api/update-profile'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

const storeConfigurationFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})

type StoreConfigurationSchema = z.infer<typeof storeConfigurationFormSchema>

export function StoreConfigurationDialog() {
  const queryClient = useQueryClient()

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreConfigurationSchema>({
    resolver: zodResolver(storeConfigurationFormSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  function updateManagedRestaurantCache({
    name,
    description,
  }: StoreConfigurationSchema) {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'managed-restaurant',
    ])

    if (cached) {
      queryClient.setQueryData(['managed-restaurant'], {
        ...cached,
        name,
        description,
      })
    }

    return { cached }
  }

  const { mutateAsync: update } = useMutation({
    mutationFn: updateProfile,
    onMutate({ name, description }) {
      const { cached } = updateManagedRestaurantCache({ name, description })

      return { previous: cached }
    },
    onError(_, __, context) {
      if (context?.previous) {
        updateManagedRestaurantCache(context?.previous)
      }
    },
  })

  async function handleUpdate(values: StoreConfigurationSchema) {
    try {
      await update({ name: values.name, description: values.description })
      toast.success('Profile updated')
    } catch (err) {
      toast.error('Error, please try again!')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Store configuration</DialogTitle>
        <DialogDescription>
          Your store settings, these settings are visible to your customer.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdate)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Name
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Description
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" disabled={isSubmitting}>
              Close
            </Button>
          </DialogClose>
          <Button variant="success" type="submit" disabled={isSubmitting}>
            Update
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
