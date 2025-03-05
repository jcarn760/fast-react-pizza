import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  const { address, phone, priority } = order;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Need to make an update?</h2>
      <fetcher.Form method="PATCH" className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              className="input bg-white"
              type="tel"
              name="phone"
              defaultValue={phone}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input bg-white"
              type="text"
              name="address"
              defaultValue={address}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            type="checkbox"
            name="priority"
            id="priority"
            defaultChecked={priority}
          />
          <label className="font-medium" htmlFor="priority">
            Make priority
          </label>
        </div>

        <Button type="primary">Update Order</Button>
      </fetcher.Form>
    </div>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Create an object to hold the updated fields
  const updatedFields = {};

  // Check if each field is present in the form data and add it to the updatedFields object
  if (data.phone) updatedFields.phone = data.phone;
  if (data.address) updatedFields.address = data.address;
  updatedFields.priority = formData.get("priority") === "on";

  await updateOrder(params.orderId, updatedFields);
  return null;
}
