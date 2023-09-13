import React,{useState} from 'react'

type Props = {}

export default function TestForm({ }: Props) {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error('User not found');
            }

            const data = await response.json();
            setUserData(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setUserData(null);
        }
    };
    return (
        <div className='text-black'>
            <h1>GitHub User Info</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter a GitHub username:
                    <input type="text" value={username} onChange={handleInputChange} />
                </label>
                <button type="submit">Fetch Data</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {userData && (
                <div>
                    <h2>User Data:</h2>
                    <p>Username: {userData.login}</p>
                    <p>Name: {userData.name}</p>
                    <p>Followers: {userData.followers}</p>
                    <p>Public Repos: {userData.public_repos}</p>
                    {/* You can display more user data properties as needed */}
                </div>
            )}
        </div>
    )
}