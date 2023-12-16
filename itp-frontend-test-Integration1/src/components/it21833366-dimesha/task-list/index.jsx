
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import Button from '../../common/button'
const TaskList = ({ taskList }) => {
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {taskList.map((task) => (
                <li key={task.email} className="flex justify-between gap-x-6 py-3">
                    <div className="flex min-w-0 gap-x-4">
                        <FontAwesomeIcon
                            //className="mr-4 text-xl text-gray-400"
                            className="h-7 w-7 flex-none rounded-full text-gray-400"
                            icon={faListCheck}
                        />
                        {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="person image" /> */}
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-3 text-gray-900">{task.name}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{task.email}</p>
                        </div>
                        <div>
                            <button class="inline-flex items-center justify-center w-4 h-4 mr-2 text-gray-100 transition-colors duration-150 bg-gray-400 rounded-full focus:shadow-outline hover:bg-gray-800">
                                <FontAwesomeIcon
                                    //className="mr-4 text-xl text-gray-400"
                                    className="h-2 w-2 flex-none rounded-full text-black-600"
                                    icon={faXmark}
                                />

                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default TaskList