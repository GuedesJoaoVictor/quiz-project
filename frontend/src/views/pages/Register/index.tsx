/**
 * Gerencia a view de Registro
 * @constructor 
 */


export default function Register() {
    return(
        <div>
            <h1>Register page</h1>
            <form method="POST" action="google.com">
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" required/>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" required/>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" required/>
                <button type="submit" className="bg-slate-700">Register</button>
            </form>
        </div>
    );
}