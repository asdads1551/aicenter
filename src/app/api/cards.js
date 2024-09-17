import { AIcard } from '../../models/AIcard';  // 請確保這個路徑是正確的

export async function GET(req) {
  try {
    const cards = await AIcard.find();
    return new Response(JSON.stringify(cards), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) {
  const { name, category, imageUrl, shareCount, viewCount, savedCount } = await req.json();

  const newCard = new AIcard({
    name
    // 添加其他字段如果需要
  });

  try {
    const savedCard = await newCard.save();
    return new Response(JSON.stringify(savedCard), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PATCH(req) {
  const { id } = req.params;
  const updateData = await req.json();

  try {
    const updatedCard = await AIcard.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedCard) {
      return new Response(JSON.stringify({ message: 'Card not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify(updatedCard), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(req) {
  const { id } = req.params;

  try {
    const result = await AIcard.findByIdAndDelete(id);
    if (!result) {
      return new Response(JSON.stringify({ message: 'Card not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ message: 'Card deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}