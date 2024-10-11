import React from 'react'
import { Button } from "@material-tailwind/react"
import { useTranslation } from "react-i18next"
import { destroyAccessToken } from '@/utils/cookies'
import { useRouter } from 'next/navigation'

const LogoutButton: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation()

  const signOut = () => {
    destroyAccessToken()
    router.push("/sigIn")
  }

  return (
    // <Button
    //   key="btn-logout"
    //   variant="filled"
    //   size="md"
    //   onClick={() => signOut()}
    // >
    //   {t('logout')}
    // </Button>
        <div onClick={() => signOut()} role="button"
        className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
        <div className="grid mr-4 place-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
            className="w-5 h-5">
            <path fill-rule="evenodd"
              d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
              clip-rule="evenodd"></path>
          </svg>
        </div>
        Log Out
      </div>
  )
}

export default LogoutButton