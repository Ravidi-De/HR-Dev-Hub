const NotificationList = ({ nList }) => {
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {nList.map((task) => (
                <li key={task.email} className="flex justify-between gap-x-6 py-3">
                    <button class="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
  <svg class="w-4 h-4 mr-3 fill-current" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
 
</button> 
                </li>
            ))}
        </ul>
    )
}

export default NotificationList



