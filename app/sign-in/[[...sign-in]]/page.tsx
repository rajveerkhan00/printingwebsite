import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-page-primary">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-primary">
            Admin Sign In
          </h2>
          <p className="mt-2 text-sm text-tertiary">
            Enter your credentials to access the admin panel
          </p>
        </div>
        
        <div className="mt-8">
          <SignIn 
            appearance={{
              variables: {
                colorPrimary: 'var(--accent-primary)',
                colorText: 'var(--text-primary)',
                colorBackground: 'var(--page-secondary)',
                colorInputBackground: 'var(--page-primary)',
                colorInputText: 'var(--text-primary)',
                colorNeutral: 'var(--border-light)',
                colorDanger: '#ef4444',
              },
              elements: {
                rootBox: "w-full",
                card: "shadow-xl rounded-lg border border-light bg-page-secondary",
                headerTitle: "text-primary",
                headerSubtitle: "text-tertiary",
                formButtonPrimary: 
                  "bg-accent hover:opacity-90 text-white font-medium",
                socialButtonsBlockButton: 
                  "border border-light bg-page-primary hover:bg-page-tertiary text-primary",
                socialButtonsBlockButtonText: "text-primary",
                formFieldInput: 
                  "border border-light bg-page-primary text-primary focus:border-accent focus:ring-1 focus:ring-accent",
                formFieldLabel: "text-primary",
                footerActionLink: 
                  "text-accent hover:opacity-80",
                footerActionText: "text-tertiary",
                dividerLine: "bg-border-light",
                dividerText: "text-tertiary",
                identityPreviewText: "text-primary",
                formResendCodeLink: "text-accent",
              },
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            redirectUrl="/admin"
            forceRedirectUrl="/admin"
          />
        </div>
      </div>
    </div>
  );
}