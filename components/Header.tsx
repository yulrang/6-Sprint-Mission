import Link from "next/link";
import Image from "next/image";
import ImgUser from "@/src/img/ic_profile.svg";
import { useAuth } from "@/src/contexts/AuthProvider";
import Logo from "./Logo";
import GNB from "./GNB";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/react";

export default function Header() {
  const { isAuth, logout } = useAuth(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="header">
      <div className="header-wrap">
        <div className="section-header">
          <Link href="/">
            <Logo>판다마켓</Logo>
          </Link>
          <GNB />
        </div>
        <div>
          {isAuth ? (
            <button type="button" onClick={onOpen}>
              <Image src={ImgUser} width={40} height={40} alt="유저 이미지" />
            </button>
          ) : (
            <Link href="/signin" className="btn-login">
              로그인
            </Link>
          )}
        </div>
        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          size="sm"
          onOpenChange={onOpenChange}
          radius="lg"
          classNames={{
            wrapper: "flex text-xl justify-center items-center",
            body: "text-center",
            base: "text-[#111]",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                <ModalBody>
                  <p className="inline-block p-10">로그아웃 하시겠습니까?</p>
                </ModalBody>
                <ModalFooter className="justify-center">
                  <Button color="default" onPress={onClose}>
                    취소
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      onClose();
                      handleLogout();
                    }}
                  >
                    확인
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </header>
  );
}
