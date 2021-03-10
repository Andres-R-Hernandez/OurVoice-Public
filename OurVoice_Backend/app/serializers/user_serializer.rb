class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :votes, :constituents
end
